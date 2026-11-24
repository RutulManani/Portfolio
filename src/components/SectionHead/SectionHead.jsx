import './SectionHead.css';

/* One heading pattern for every section on the site:
   a hairline, then a bold section title, with an optional small note
   on the right. */
export default function SectionHead({ title, as: Tag = 'h2', aside }) {
  return (
    <header className="sh">
      <Tag className="sh-title">{title}</Tag>
      {aside && <span className="sh-aside">{aside}</span>}
    </header>
  );
}
