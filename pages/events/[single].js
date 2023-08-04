import config from "@config/config.json";
import EventSingle from "@layouts/EventSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import { sortByDate } from "@lib/utils/sortFunctions";
const { events_folder } = config.settings;

// event single layout
const Article = ({ event, authors, mdxContent, slug, recentEvents }) => {
  const { frontmatter, content } = event[0];

  return (
    <EventSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
      recentevents={recentEvents}
    />
  );
};

// get event single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${events_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get event single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const events = getSinglePage(`content/${events_folder}`);
  const event = events.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(event[0].content);
  const recentEvents = sortByDate(events).filter((event) => event.slug !== single);

  return {
    props: {
      event: event,
      mdxContent: mdxContent,
      slug: single,
      recentEvents: recentEvents,
    },
  };
};

export default Article;
