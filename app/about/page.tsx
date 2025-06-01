import { createMetadata } from "@/lib/seo/metadata";
import Image from "next/image";

export const metadata = createMetadata({
  title: "За нас",
  description: "Научете повече за Stox.bg и екипа зад платформата. Създадена от Давид Петков и Devids - иновативни решения за финансовите пазари в България.",
  keywords: [
    "Давид Петков", "Devids", "финансова платформа", "България", 
    "софтуерна разработка", "иновации", "технологии", "ИУ Варна"
  ],
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            За нас
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Създадохме Stox.bg като мястото, където инвеститорите намират всичко накуп - 
            най-важното от пазара, събрано, синтезирано и разбираемо.
          </p>
        </div>

        {/* Platform Section */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start mb-20">
          <div className="order-2 lg:order-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Какво е Stox.bg?
            </h2>
            <div className="space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                <strong className="text-foreground">Stox.bg</strong> се появява на българския пазар като 
                амбициозен отговор на нуждата от достъпна финансова информация. Платформата е създадена 
                с ясна визия – да преобрази начина, по който българските инвеститори получават и 
                обработват инвестиционни данни.
              </p>
              <p>
                Това, което прави платформата уникална, е нейният подход към синтезирането на информация. 
                Вместо да заливат потребителите с безкрайни потоци от сурови данни, екипът зад Stox.bg 
                е избрал да обработва и представя най-важното от глобалните финансови пазари в 
                лесно усвоим формат.
              </p>
              <p>
                Мисията на платформата е амбициозна, но ясна – да демократизира достъпа до качествени 
                финансови анализи и да създаде мост между сложния свят на инвестициите и обикновените 
                българи, които искат да управляват по-добре своите финанси.
              </p>
            </div>
          </div>
          
          <div className="rounded-xl bg-card shadow-xl ring-1 ring-border overflow-hidden order-1 lg:order-1">
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src="/images/man-analyzing-financial-data.jpeg"
                alt="Анализ на финансови данни - Stox.bg платформа"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xl font-semibold mb-1">📊 Stox.bg</div>
                <div className="text-sm opacity-90">Финансовата платформа на бъдещето</div>
              </div>
            </div>
          </div>
        </div>

        {/* Devids Company Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start">
            <div className="relative lg:order-1">
              <div className="rounded-xl shadow-xl ring-1 ring-border overflow-hidden">
                <Image
                  src="/images/devidsbanner.png"
                  alt="Devids - Елегантни софтуерни решения"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            
            <div className="lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                За Devids
              </h2>
              <div className="space-y-6 text-lg leading-8 text-muted-foreground">
                <p>
                  В основата на Stox.bg стои <strong className="text-foreground">&ldquo;Devids&rdquo;</strong> – 
                  ИТ компания, която се появява на пазара с ясна амбиция да промени начина, 
                  по който се подхожда към софтуерната разработка в България. Основана от 
                  Давид Петков и неговия съосновател Давид Христов, компанията носи в себе си 
                  младежки дух и иновативна визия.
                </p>
                <p>
                  Философията на Devids се корени в убеждението, че <strong className="text-foreground">елегантността 
                  и функционалността</strong> не са взаимно изключващи се концепции. Екипът подхожда 
                  към всеки проект с обсесивно внимание към детайла и неспокойство за чистотата на кода, 
                  създавайки решения, които не просто работят, а работят изящно.
                </p>
                <p>
                  Мисията на младата компания е амбициозна – да създава софтуерни решения, които не 
                  само отговарят на техническите изисквания, но и преобразяват сложни проблеми в 
                  елегантни, интуитивни интерфейси. Всеки проект е възможност да докажат, че 
                  иновацията и простотата могат да съществуват в хармония.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 