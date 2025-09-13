import { generateSEOMetadata } from "@/lib/seo/utils";
import Image from "next/image";

export const metadata = generateSEOMetadata({
  title: "Какво е Stox.bg?",
  description: "stox.bg – проект на Devids. Хъб за бизнес и технологични истории, уроци и постижения от екипа на Devids – воден от двама основатели под 20.",
  keywords: [
    "Devids", "стартъп", "бизнес", "технологии", "екип",
    "млади основатели", "продукт", "истории от компанията", "stox.bg"
  ],
  canonical: "/about",
  ogImage: "/images/devidsbanner.png",
});

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Какво е stox.bg?
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            stox.bg е проект на <span className="text-foreground font-semibold">Devids</span> –
            дом за историите ни, за това как взимаме решения, какво научаваме и как избираме технологични подходи.
          </p>
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