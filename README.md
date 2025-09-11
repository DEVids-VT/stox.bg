# stox.bg – проект на Devids

Високопроизводителен, SEO-оптимизиран Next.js проект с server-side rendering възможности, създаден за модерни уеб приложения.

## 🚀 Функции

- **Server-Side Rendering**: Използва Next.js SSR за подобрена производителност и SEO предимства
- **SEO Оптимизация**: Вградено управление на метаданни, Open Graph тагове и структурирани данни
- **TypeScript Поддръжка**: Пълна TypeScript интеграция за по-добра типова безопасност
- **Tailwind CSS**: Utility-first CSS фреймуърк за бърза UI разработка
- **Shadcn UI Компоненти**: Красиво дизайнирани, достъпни UI компоненти
- **Плавно Скролиране**: Интегриран Lenis за плавно скролиране
- **Lucide Икони**: Красиви, консистентни, open-source икони като React компоненти
- **Responsive Дизайн**: Напълно responsive layout за всички устройства
- **Достъпност**: Създаден с фокус върху достъпността
- **Оптимизирана Производителност**: Оптимизиран за Core Web Vitals и бързо зареждане
- **Български Език**: Пълна поддръжка за български език и локализация

## 🛠️ Бързо Стартиране

### Предварителни Изисквания

- Node.js 18.17.0 или по-нова версия
- npm, yarn, или pnpm

### Инсталация

1. Клонирайте репозитория:
   ```bash
   git clone https://github.com/yourusername/stox-bg.git
   cd stox-bg
   ```

2. Стартирайте автоматичната настройка:
   ```bash
   ./scripts/setup.sh
   ```

   Или ръчно:
   ```bash
   npm install
   cp .env.example .env.local
   # Редактирайте .env.local с вашите API ключове
   ```

3. Стартирайте development сървъра:
   ```bash
   npm run dev
   ```

4. Отворете [http://localhost:3000](http://localhost:3000) в браузъра си.

## 📁 Структура на Проекта

```
├── app/                   # App Router страници и layouts
│   ├── about/             # За нас страница
│   ├── business/          # Бизнес страница
│   ├── contact/           # Контакти страница
│   ├── technology/        # Технологии страница
│   ├── legal/             # Правни страници
│   ├── terms/             # Условия за ползване
│   ├── c/                 # Динамични страници
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Начална страница
├── components/            # Преизползваеми компоненти
│   ├── layout/            # Layout компоненти (header, footer)
│   ├── providers/         # Provider компоненти
│   ├── ui/                # UI компоненти
│   └── fastlane/          # Fastlane специфични компоненти
├── lib/                   # Utility функции и библиотеки
│   ├── seo/               # SEO utilities
│   └── utils.ts           # Общи utility функции
├── public/                # Статични файлове
│   └── images/            # Изображения и асети
├── scripts/               # Скриптове за автоматизация
├── guides/                # Документация и ръководства
├── .github/               # GitHub Actions workflows
├── .vscode/               # VS Code настройки
├── components.json        # shadcn UI конфигурация
├── next.config.ts         # Next.js конфигурация
├── tailwind.config.ts     # Tailwind CSS конфигурация
├── tsconfig.json          # TypeScript конфигурация
├── .prettierrc            # Prettier конфигурация
├── .eslintrc.mjs          # ESLint конфигурация
├── Dockerfile             # Docker конфигурация
└── package.json           # Зависимости и скриптове
```

## 🎯 Доступни Команди

### Development
```bash
npm run dev              # Стартира development сървър с Turbopack
npm run build            # Създава production build
npm run start            # Стартира production сървър
npm run clean            # Почиства build артефакти
```

### Code Quality
```bash
npm run lint             # Стартира ESLint
npm run lint:fix         # Поправя ESLint проблеми
npm run type-check       # Стартира TypeScript type checking
npm run format           # Форматира кода с Prettier
npm run format:check     # Проверява форматирането
```

### SEO & Performance
```bash
npm run seo:validate     # Валидира SEO имплементацията
npm run seo:test         # Стартира Lighthouse SEO тест
npm run analyze          # Анализира bundle размера
```

### Database (когато се конфигурира)
```bash
npm run db:generate      # Генерира database schema
npm run db:push          # Push-ва промените в базата данни
npm run db:studio        # Отваря database studio
```

## Customization

### Metadata and SEO

Update the site-wide metadata in `app/layout.tsx` and use the `createMetadata` function from `lib/seo/metadata.ts` to create page-specific metadata.

### UI Components

This template uses shadcn UI components. You can add more components with:

```bash
npx shadcn add [component-name]
```

### Styling

This template uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

## Deployment

You can deploy this template to any platform that supports Next.js, such as Vercel, Netlify, or a self-hosted server.

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Lenis by Studio Freight](https://lenis.studiofreight.com/)
