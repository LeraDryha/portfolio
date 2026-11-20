import { person } from "@/content/site";
import { Icon, NewTab } from "@/components/shell/Icons";

/**
 * The end of every case (Lera's variant B): her question in the voice face, the email as the one action
 * (written out, with a copy button), LinkedIn and Telegram as small pills under it. Not on the home page.
 * The copy behaviour lives in CaseBehavior.
 */
export function ContactStrip() {
  const handle = person.telegram.split("/").pop();
  return (
    <section className="contact-strip" aria-labelledby="contact-title">
      <h2 className="contact-strip__voice" id="contact-title">
        Hiring a product designer? <em>Let’s talk.</em>
      </h2>
      <div className="contact-strip__mail">
        <a href={`mailto:${person.email}`}>{person.email}</a>
        <button className="contact-strip__copy" type="button" data-copy={person.email} aria-label={`Copy email ${person.email}`}>
          <Icon name="copy" />
        </button>
        <span className="contact-strip__toast" role="status" />
      </div>
      <div className="contact-strip__more">
        <a className="contact-pill" href={person.linkedin} target="_blank" rel="noopener">
          <span className="contact-pill__in" aria-hidden="true">in</span>
          LinkedIn
          <NewTab />
        </a>
        <a className="contact-pill" href={person.telegram} target="_blank" rel="noopener">
          {/* The Telegram mark, small: the blue circle and the white plane */}
          <svg className="contact-pill__tg" viewBox="0 0 240 240" aria-hidden="true">
            <circle cx="120" cy="120" r="120" fill="var(--color-telegram)" />
            <path d="M54.3 118.8c35-15.2 58.3-25.3 70-30.2 33.3-13.9 40.3-16.3 44.8-16.4 1 0 3.2.2 4.7 1.4 1.2 1 1.5 2.3 1.7 3.3s.4 3.1.2 4.7c-1.8 19-9.6 65.1-13.6 86.3-1.7 9-5 12-8.2 12.3-7 .6-12.3-4.6-19-9-10.6-6.9-16.5-11.2-26.8-18-11.9-7.8-4.2-12.1 2.6-19.1 1.8-1.8 32.5-29.8 33.1-32.3.1-.3.1-1.5-.6-2.1-.7-.6-1.7-.4-2.5-.2-1.1.2-17.9 11.4-50.6 33.5-4.8 3.3-9.1 4.9-13 4.8-4.3-.1-12.5-2.4-18.7-4.4-7.5-2.4-13.5-3.7-13-7.9.3-2.2 3.3-4.4 8.9-6.7z" fill="var(--color-on-dark)" />
          </svg>
          @{handle}
          <NewTab />
        </a>
      </div>
    </section>
  );
}
