import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import Event from "@partials/Event";
import { useEffect, useRef } from "react";
const { events_folder } = config.settings;

// event pagination
const EventPagination = ({
  eventIndex,
  events,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastEvent = currentPage * pagination;
  const indexOfFirstEvent = indexOfLastEvent - pagination;
  const totalPages = Math.ceil(events.length / pagination);
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const { frontmatter } = eventIndex;
  const { title } = frontmatter;
  const eventsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(eventsRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base title={title}>
      <section className="section pt-0">
        <Banner title={title} />
        <div className="container">
          <div
            className="row justify-center pt-20 pb-16 opacity-0"
            ref={eventsRef}
          >
            {currentEvents.map((event, i) => (
              <div key={`key-${i}`} className="mb-8 lg:col-5">
                <Event event={event} authors={authors} />
              </div>
            ))}
          </div>
          <Pagination
            section={events_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
      {/* CTA */}
      <Cta />
    </Base>
  );
};

export default EventPagination;

// get event pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${events_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get event pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const events = getSinglePage(`content/${events_folder}`);
  const eventIndex = await getListPage(`content/${events_folder}/_index.md`);

  return {
    props: {
      pagination: pagination,
      events: events,
      currentPage: currentPage,
      eventIndex: eventIndex,
    },
  };
};
