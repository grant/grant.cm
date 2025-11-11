export default function Sections(props) {
  return <div className="[box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] overflow-hidden [&>_.title]:cursor-pointer">{props.children}</div>;
}
