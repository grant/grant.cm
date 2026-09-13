import SecondaryShell from '../../components/secondaryShell';

export default function Consulting() {
  const consultingOptions = [
    {
      duration: 15,
      price: 125,
      title: '15 Min - $125',
      description: 'Brief advice, quick discussions, problem scoping',
    },
    {
      duration: 30,
      price: 225,
      title: '30 Min - $225',
      description: 'Technical analysis, market dynamics, initial strategy',
    },
    {
      duration: 60,
      price: 400,
      title: '60 Min - $400',
      description:
        'Strategic consulting, market research, complex problem solving',
    },
  ];

  return (
    <SecondaryShell title="Timmerman Consulting, LLC">
      <div className="max-w-3xl">
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-dark">
          I help businesses and individuals design and develop thoughtful
          software products, developer platforms, and websites.
        </p>
        <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-1">
          {consultingOptions.map(option => (
            <a
              key={option.duration}
              href={`/consulting/${option.duration}`}
              className="rounded-lg border border-muted bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="mb-2 text-lg font-bold">{option.title}</h2>
              <p className="text-small text-gray-dark">{option.description}</p>
            </a>
          ))}
        </div>
        <p className="mt-8 text-gray-dark">
          Questions? Email{' '}
          <a
            className="font-bold text-primary-dark underline"
            href="mailto:granttimmerman@gmail.com"
          >
            granttimmerman@gmail.com
          </a>
          .
        </p>
      </div>
    </SecondaryShell>
  );
}
