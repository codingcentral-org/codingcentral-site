interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-neutral-200 bg-[#f7f7f4]">
      <div className="site-container py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="display-title text-[2.6rem] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="body-large mt-5 max-w-2xl">{description}</p>
        </div>
      </div>
    </section>
  );
}
