import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import Link from "next/link";

const Event = ({ event, i }) => {
  const { summary_length, events_folder } = config.settings;
  console.log(events_folder)
  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {event.frontmatter.image && (
        <Link href={`/${events_folder}/${event.slug}`}>
          <ImageFallback
            className="w-full object-cover"
            src={event.frontmatter.image}
            alt={event.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4">
          <Link
            href={`/${events_folder}/${event.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {event.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
            {dateFormat(event.frontmatter.date)} - {event.frontmatter.location}
        </p>
        <p className="mt-4">
          {event.content.slice(0, Number(summary_length))}...
        </p>
        {/* <div className="mt-6 flex items-center">
          <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
            <ImageFallback
              src={event.frontmatter.author.avatar}
              width={50}
              height={50}
              alt="author"
            />
          </div>
          <div className="pl-5">
            <p className="font-medium text-dark">
              {event.frontmatter.author.name}
            </p>
            <p>
              {dateFormat(event.frontmatter.date)} - {readingTime(event.content)}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Event;
