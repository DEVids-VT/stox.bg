# DEVIDS

# Authentication Between React and .NET Using OAuth 2.0 and OIDC with Auth0

This guide provides a practical, step-by-step implementation of authentication between a React frontend and .NET Core backend using OAuth 2.0 and OpenID Connect (OIDC) flows with Auth0, based on the SkillNet project implementation.

## Understanding the Authentication Flow

The authentication process follows the **Authorization Code Flow with PKCE** (Proof Key for Code Exchange), which is the recommended approach for single-page applications (SPAs) like React. Here's how it works:[^1][^2]

1. User clicks login in React app
2. React redirects to Auth0 Universal Login
3. User authenticates with Auth0
4. Auth0 redirects back with authorization code
5. React exchanges code for tokens (ID token, access token)
6. React sends API requests with JWT access token
7. .NET API validates JWT token and processes requests

![](https://assets-developers.ringcentral.com/dpw/guide/images/oauth-auth-token-pkce-flow.png?v=2025-07-08)

## React Frontend Implementation

### 1. Install Dependencies

First, install the Auth0 React SDK in your React project:

```bash
npm install @auth0/auth0-react
```

### 2. Configure Auth0Provider

To handle user authentication in a secure and centralized way, we use Auth0Provider. This provider wraps our application and connects it to Auth0’s authentication service. It manages login, logout, and session persistence, and ensures that authenticated users can access protected resources. Setting up the Auth0Provider properly allows your frontend to securely interact with APIs that require user authentication, while maintaining user sessions across page reloads.

**src/components/auth-provider/auth_config.json**

```json
{
  "domain": "your-auth0-domain.auth0.com",
  "clientId": "your-client-id"
}
```

**src/components/auth-provider/config.ts**

```typescript
import configJson from "./auth_config.json";

export function getConfig() {
  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
  };
}
```

**src/components/auth-provider/providerConfig.ts**

```typescript
import { AppState, Auth0ProviderOptions, User } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { getConfig } from "./config";

const config = getConfig();

const onRedirectCallback: Auth0ProviderOptions["onRedirectCallback"] = (
  appState?: AppState,
  _?: User
) => {
  createBrowserHistory().push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

export const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "https://your-api-url.com", // Your API identifier
    scope: "openid profile email your-custom-scope",
  },
};
```

**src/components/auth-provider/Auth0Provider.tsx**

```typescript
import { Auth0Provider as Auth0ProviderLib } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { providerConfig } from "./providerConfig";

function Auth0Provider({ children }: PropsWithChildren) {
  return <Auth0ProviderLib {...providerConfig}>{children}</Auth0ProviderLib>;
}

export default Auth0Provider;
```

### 3. Set Up Route Protection

Certain parts of your application should only be accessible to authenticated users—such as user dashboards or admin pages. To enforce this, we use a component called AuthorizeRoute. It checks if a user is authenticated using Auth0. If not, it automatically redirects them to the login screen. This ensures that only authorized users can view protected routes.

**src/components/authorize-route/AuthorizeRoute.tsx**

```typescript
import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren, useEffect } from "react";

export default function AuthorizeRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return isAuthenticated ? <>{children}</> : null;
}
```

### 4. Create User Credentials Hook

After authentication, you often need to access user-specific data like email, name, roles, or user ID. The useUserCredentials hook extracts this information from the Auth0 token and formats it in a consistent way for use across your application. It also pulls out custom claims like user roles, which are necessary for role-based access control.

**src/hooks/useUserCredentials.ts**

```typescript
import { useAuth0 } from "@auth0/auth0-react";

export interface IUser {
  userId: string;
  name: string;
  email: string;
  picture: string;
  roles: string[];
}

const DOMAIN = "https://your-domain.com";

export const useUserCredentials = () => {
  const { user } = useAuth0();
  const roles = user?.[`${DOMAIN}/roles`] as string[];

  return {
    user: {
      userId: user?.sub as string,
      name: user?.name as string,
      email: user?.email as string,
      picture: user?.picture as string,
      roles,
    },
  };
};
```

### 5. Set Up Axios Interceptor

To interact securely with your backend APIs, your app needs to send a valid JWT access token with each request. The AxiosInterceptor automatically attaches this token to every outgoing HTTP request made through Axios. This ensures all requests are authenticated without manually adding headers each time.

**src/components/axios-interceptor/AxiosInterceptor.tsx**

```typescript
import { useAuth0 } from "@auth0/auth0-react";
import axios, { InternalAxiosRequestConfig } from "axios";
import { PropsWithChildren, useEffect, useState } from "react";

export const axiosInstance = axios.create({
  baseURL: "https://your-api-url.com",
});

function AxiosInterceptor({ children }: PropsWithChildren) {
  const { getAccessTokenSilently } = useAuth0();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const reqInterceptor = async (config: InternalAxiosRequestConfig) => {
      const accessToken = await getAccessTokenSilently();
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    };

    const axiosReqInterceptor =
      axiosInstance.interceptors.request.use(reqInterceptor);
    setIsSet(true);

    return () => {
      axiosInstance.interceptors.request.eject(axiosReqInterceptor);
    };
  }, [getAccessTokenSilently]);

  return isSet ? <>{children}</> : null;
}

export default AxiosInterceptor;
```

### 6. Configure App.tsx

Your application needs to be wrapped with all required providers to enable authentication, route protection, and secure API communication. The App component brings everything together by wrapping your app in the Auth0Provider, AuthorizeRoute, and AxiosInterceptor layers. This setup ensures users are authenticated, protected routes are enforced, and backend APIs receive the proper tokens.

**src/App.tsx**

```typescript
import { Outlet } from "react-router-dom";
import Auth0Provider from "./components/auth-provider/Auth0Provider";
import AuthorizeRoute from "./components/authorize-route/AuthorizeRoute";
import AxiosInterceptor from "./components/axios-interceptor/AxiosInterceptor";

function App() {
  return (
    <Auth0Provider>
      <AuthorizeRoute>
        <AxiosInterceptor>
          {/* Your app components */}
          <Outlet />
        </AxiosInterceptor>
      </AuthorizeRoute>
    </Auth0Provider>
  );
}

export default App;
```

## .NET Backend Implementation

### 1. Install Required Packages

Add the necessary NuGet packages to your .NET project:

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Auth0.ManagementApi
```

### 2. Configure Authentication Settings

**appsettings.json**

```json
{
  "Auth0": {
    "Domain": "your-auth0-domain.auth0.com",
    "Audience": "https://your-api-url.com",
    "ClientId": "your-machine-to-machine-client-id",
    "ClientSecret": "your-machine-to-machine-client-secret",
    "CandidateRole": "rol_candidate_role_id"
  },
  "AuthenticationSettings": {
    "Authority": "https://your-auth0-domain.auth0.com/",
    "Audience": "https://your-api-url.com"
  }
}
```

### 3. Configure JWT Authentication

To secure the backend and ensure that only authenticated users can access protected resources, we configure JWT (JSON Web Token) authentication using Auth0 as the identity provider. This setup reads the authority and audience from configuration, and enables the backend to validate incoming tokens from the frontend, ensuring users are who they claim to be.

![](https://fusionauth.io/img/shared/json-web-token.png)

#### USE THIS TO CHECK YOUR TOKENS

https://www.jwt.io/

#

**src/SkillNet.Infrastructure/InfrastructureConfiguration.cs**

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class InfrastructureConfiguration
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
        => services
            .AddIdentity(configuration)
            .AddAuth0ManagementApi(configuration);

    private static IServiceCollection AddIdentity(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(opts =>
        {
            opts.Authority = configuration.GetSection("AuthenticationSettings")["Authority"]!;
            opts.Audience = configuration.GetSection("AuthenticationSettings")["Audience"]!;
        });

        return services;
    }
}
```

### 4. Create Auth0 Token Provider

Some backend operations—like accessing the Auth0 Management API to create or update users—require machine-to-machine (client credentials) authentication. The Auth0TokenProvider handles this by requesting a token from Auth0 and caching it for reuse. This improves performance and avoids unnecessary token requests by only refreshing the token when it’s near expiration.

#### RESOURCES

https://auth0.com/docs/api/management/v2

#

**src/SkillNet.Infrastructure/Identity/Services/Auth0TokenProvider.cs**

```csharp
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text;

public interface ITokenProvider
{
    Task<string> GetTokenAsync(CancellationToken cancellationToken = default);
}

internal class Auth0TokenProvider : ITokenProvider
{
    private readonly HttpClient _httpClient;
    private readonly Auth0Options _options;
    private string? _cachedToken;
    private DateTime _tokenExpiration = DateTime.MinValue;
    private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);

    public Auth0TokenProvider(HttpClient httpClient, IOptions<Auth0Options> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<string> GetTokenAsync(CancellationToken cancellationToken = default)
    {
        // Check if we have a valid cached token
        if (!string.IsNullOrEmpty(_cachedToken) && _tokenExpiration > DateTime.UtcNow.AddMinutes(5))
        {
            return _cachedToken;
        }

        await _semaphore.WaitAsync(cancellationToken);
        try
        {
            // Double-check after acquiring the lock
            if (!string.IsNullOrEmpty(_cachedToken) && _tokenExpiration > DateTime.UtcNow.AddMinutes(5))
            {
                return _cachedToken;
            }

            // Prepare token request
            var tokenRequest = new
            {
                client_id = _options.ClientId,
                client_secret = _options.ClientSecret,
                audience = _options.Audience,
                grant_type = "client_credentials"
            };

            var content = new StringContent(
                JsonConvert.SerializeObject(tokenRequest),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(
                $"https://{_options.Domain}/oauth/token",
                content,
                cancellationToken);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync(cancellationToken);
            var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseContent);

            _cachedToken = tokenResponse.AccessToken;
            _tokenExpiration = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn);

            return _cachedToken;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    private class TokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; } = default!;

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
    }
}
```

### 5. Set Up Management API Integration

Configure the Auth0 Management API for user management operations:[^4]

```csharp
public static IServiceCollection AddAuth0ManagementApi(this IServiceCollection services, IConfiguration configuration)
{
    var domain = configuration["Auth0:Domain"];

    if (string.IsNullOrWhiteSpace(domain))
        throw new InvalidOperationException("Auth0 Domain is not configured.");

    services.AddHttpClient<ITokenProvider, Auth0TokenProvider>();
    services.AddSingleton<ITokenProvider, Auth0TokenProvider>();

    services.AddTransient<ManagementApiClient>(provider =>
    {
        var tokenProvider = provider.GetRequiredService<ITokenProvider>();
        var options = provider.GetRequiredService<IOptions<Auth0Options>>();

        var token = tokenProvider.GetTokenAsync().GetAwaiter().GetResult();

        return new ManagementApiClient(token, new Uri($"https://{options.Value.Domain}/api/v2/"));
    });

    return services;
}
```

### 6. Configure Web Layer

**src/SkillNet.Web/WebConfiguration.cs**

```csharp
public static class WebConfiguration
{
    public static IServiceCollection AddWeb(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddWebComponents(configuration);
        return services;
    }

    private static IServiceCollection AddWebComponents(this IServiceCollection services, IConfiguration config)
    {
        services.AddMvc(o =>
        {
            // Require authentication for all controllers by default
            o.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build()));
        });

        return services;
    }
}
```

### 7. Create API Controller Base Class

**src/SkillNet.Web/ApiController.cs**

```csharp
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public abstract class ApiController : ControllerBase
{
    private IMediator? mediator;

    protected IMediator Mediator
        => this.mediator ??= this.HttpContext
            .RequestServices
            .GetService<IMediator>();
}
```

### 8. Example Protected Controller

**src/SkillNet.Web/Features/Identity/UsersController.cs**

```csharp
using Microsoft.AspNetCore.Mvc;

[Route("u")]
public class UsersController : ApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserOutputModel>>> All([FromQuery] AllUsersQuery query)
        => await Send(query);

    [HttpGet("{id}")]
    public async Task<ActionResult<UserOutputModel>> Details([FromRoute] DetailsUserQuery userQuery)
        => await Send(userQuery);
}
```

### 9. Configure Program.cs

**src/SkillNet.Startup/Program.cs**

```csharp
using SkillNet.Application;
using SkillNet.Infrastructure;
using SkillNet.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication(builder.Configuration)
    .AddInfrastructure(builder.Configuration)
    .AddWeb(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

// Configure CORS to allow your React app
app.UseCors(opts =>
{
    opts.WithOrigins("http://localhost:5173", "https://your-react-app.com")
        .AllowCredentials();
    opts.AllowAnyHeader();
    opts.AllowAnyMethod();
});

// Authentication must come before authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
```

## Auth0 Dashboard Configuration

### 1. Create Single Page Application

1. Go to Auth0 Dashboard → Applications
2. Create a new "Single Page Web Application"
3. Configure:
   - **Allowed Callback URLs**: `http://localhost:5173, https://your-react-app.com`
   - **Allowed Logout URLs**: `http://localhost:5173, https://your-react-app.com`
   - **Allowed Web Origins**: `http://localhost:5173, https://your-react-app.com`

### 2. Create API

1. Go to Auth0 Dashboard → APIs
2. Create a new API with identifier: `https://your-api-url.com`
3. Configure scopes as needed (e.g., `read:users`, `write:users`)

### 3. Create Machine to Machine Application

1. Go to Auth0 Dashboard → Applications
2. Create a "Machine to Machine Application"
3. Authorize it for the Management API
4. Select required scopes for user management

## Key Security Considerations

**Token Validation**: The .NET API automatically validates JWT tokens for signature, issuer, audience, and expiration.[^5][^6][^7]

**HTTPS Only**: Always use HTTPS in production. The JWT Bearer middleware should be configured with `RequireHttpsMetadata = true` in production.[^8][^9]

**Token Storage**: Auth0 React SDK stores tokens securely in localStorage or sessionStorage, automatically handling refresh.[^10][^11]

**CORS Configuration**: Properly configure CORS to allow your React app domain while restricting others.[^4]

## How the Authentication Flow Works

When a user accesses your React application:

1. **Initial Load**: The `AuthorizeRoute` component checks if the user is authenticated using `useAuth0().isAuthenticated`[^3]
2. **Login Redirect**: If not authenticated, `loginWithRedirect()` redirects to Auth0 Universal Login[^12][^10]
3. **Token Exchange**: After successful authentication, Auth0 redirects back with an authorization code, which the SDK exchanges for tokens[^13][^1]
4. **API Calls**: The Axios interceptor automatically adds the JWT access token to all API requests[^3]
5. **Token Validation**: The .NET API validates the JWT token using the configured middleware[^4]
6. **User Context**: The API can access user information through the JWT claims and make additional calls to Auth0 Management API if needed[^4]

This implementation provides a secure, scalable authentication system that follows OAuth 2.0 and OIDC best practices while leveraging Auth0's managed authentication service.

<div style="text-align: center">⁂</div>

[^1]: https://auth0.com/docs/get-started/authentication-and-authorization-flow
[^2]: https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow
[^3]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/package.json
[^4]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/auth-provider/config.ts
[^5]: https://auth0.com/blog/how-to-validate-jwt-dotnet/
[^6]: https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication?view=aspnetcore-9.0
[^7]: https://auth0.com/docs/quickstart/backend/aspnet-core-webapi/interactive
[^8]: https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.JwtBearer
[^9]: https://www.telerik.com/blogs/asp-net-core-basics-authentication-authorization-jwt
[^10]: https://auth0.com/docs/quickstart/spa/react/interactive
[^11]: https://www.geeksforgeeks.org/reactjs/implementing-authentication-flows-with-react-hooks-and-auth0/
[^12]: https://auth0.com/docs/quickstart/spa/react/01-login
[^13]: https://auth0.com/blog/backend-for-frontend-pattern-with-auth0-and-dotnet/
[^14]: https://github.com/David-and-Stefan/SkillNet-SPA
[^15]: https://github.com/David-and-Stefan/SkillNet-API/tree/dev
[^16]: https://stackoverflow.com/questions/60765122/asp-net-core-validating-auth0s-jwt-token
[^17]: https://betterprogramming.pub/how-to-implement-authentication-in-react-using-auth0-1b5ecb6c8fe0
[^18]: https://www.descope.com/blog/post/oauth2-react-authentication-authorization
[^19]: https://stackoverflow.com/questions/76417049/how-to-validate-a-jwt-token-from-auth0-in-c
[^20]: https://dev.to/rodrigokamada/authentication-using-the-auth0-to-an-react-application-3da3
[^21]: https://www.reddit.com/r/dotnet/comments/zf3kgs/reactnet_how_to_implement_oauth_in_a_fullstack/
[^22]: https://auth0.com/docs/secure/tokens/json-web-tokens/validate-json-web-tokens
[^23]: https://www.youtube.com/watch?v=0b8qHQlc-hQ
[^24]: https://betterprogramming.pub/building-secure-login-flow-with-oauth-2-openid-in-react-apps-ce6e8e29630a
[^25]: https://community.auth0.com/t/how-to-validate-jwts-in-net/113163
[^26]: https://www.youtube.com/watch?v=pAzqscDx580
[^27]: https://auth0.com/docs/quickstart/backend/aspnet-core-webapi/01-authorization
[^28]: https://developer.auth0.com/resources/code-samples/api/aspnet-core/basic-authorization
[^29]: https://stackoverflow.com/questions/57399598/use-auth0s-hook-useauth0-to-get-token-and-set-header-in-apollo-client
[^30]: https://itnext.io/how-to-mock-auth0-spa-hooks-to-test-your-react-components-e45b6a38fddb
[^31]: https://community.auth0.com/t/getting-a-management-api-token-for-net/96314
[^32]: https://positiwise.com/blog/jwt-authentication-in-net-core
[^33]: https://dev.to/terrierscript/example-for-auth0-and-react-hooks-41e4
[^34]: https://github.com/auth0/auth0.net
[^35]: https://faun.pub/asp-net-core-jwt-authentication-middleware-reading-a-jwt-14cdb32e39ca
[^36]: https://auth0.github.io/auth0-react/functions/useAuth0.html
[^37]: https://auth0.com/docs/get-started/architecture-scenarios/sso-for-regular-web-apps/implementation-aspnetcore
[^38]: https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbearermiddleware?view=aspnetcore-1.1
[^39]: https://jfarrell.net/2020/07/10/using-the-management-api-with-net-core-3-1/
[^40]: https://www.youtube.com/watch?v=7ILCRfPmQxQ
[^41]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/auth-provider/Auth0Provider.tsx
[^42]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/auth-provider/providerConfig.ts
[^43]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/auth-provider/auth_config.json
[^44]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/App.tsx
[^45]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/authorize-route/AuthorizeRoute.tsx
[^46]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/hooks/useUserCredentials.ts
[^47]: https://github.com/David-and-Stefan/SkillNet-SPA/blob/dev/src/components/axios-interceptor/AxiosInterceptor.tsx
[^48]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Web/WebConfiguration.cs
[^49]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Infrastructure/InfrastructureConfiguration.cs
[^50]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Infrastructure/Identity/Services/Auth0TokenProvider.cs
[^51]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Infrastructure/Identity/Services/Auth0UserProfileService.cs
[^52]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Startup/Program.cs
[^53]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Web/ApiController.cs
[^54]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Web/Features/Identity/UsersController.cs
[^55]: https://github.com/David-and-Stefan/SkillNet-API/blob/dev/src/SkillNet.Web/Features/Organizations/OrganizationsController.cs
