export function PageTitle(props: {title: string}) {
  return (
    <h2 className="font-bold text-large tracking-widest uppercase text-center py-5 text-white">
      {props.title}
    </h2>
  );
}
