import styled from "styled-components";
import css from "@styled-system/css";
import { add, sub, compareAsc, isAfter, isBefore } from "date-fns";
import Drift from "react-driftjs";
import SectionHeader from "components/SectionHeader";
import Head from "components/Head";
import Layout, { Centrator } from "components/Layout";
import Box from "components/Box";
import Footer from "components/Footer";
import GridDisplay, { GridTile } from "components/GridDisplay";
import { Event, EventProps } from "./Event";
import teleportBlueBg from "./assets/virtual_events_blue_logo@2x.png";
import teleportGreenBg from "./assets/virtual_events_green_logo@2x.png";
import webinarIcon from "./assets/webinar.svg";

const sortEvents = (events: EventProps[]) => {
  const now = Date.now();
  const monthFromNow = add(now, { days: 30 });
  const sortedEvents = events
    //sorts events in ascending order
    .sort(({ start: startA }, { start: startB }) => compareAsc(startA, startB))
    //preserves events that are are in the future, ongoing, or have ended within the last three days
    .filter(({ start, end }) => {
      return end
        ? isAfter(sub(end, { days: 2 }), now)
        : isAfter(sub(start, { days: 2 }), now);
    });

  return {
    current: sortedEvents.filter(({ start }) => isBefore(start, monthFromNow)),
    upcoming: sortedEvents.filter(({ start }) => isAfter(start, monthFromNow)),
  };
};

interface Webinar {
  href: string;
  title: string;
  description: string;
}

interface ContentPageProps {
  meta: {
    title?: string;
    subtitle?: string;
    description?: string;
    noindex?: boolean;
    events: EventProps[];
    webinars: Webinar[];
  };
  children: React.ReactNode;
}

export const EventsPage = ({
  meta: {
    title,
    subtitle = "Teleport Access Plane",
    description,
    noindex,
    events,
    webinars,
  },
}: ContentPageProps) => {
  const { current, upcoming } = sortEvents(events);

  return (
    <>
      <Head title={title} description={description} noIndex={noindex} />
      <Layout border="none" behaviour="floating">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          bg="wave"
        />
        <Box
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="lightest-gray"
        >
          <Centrator flexDirection="column" pt={[0, 6]} pb={[3, 9]}>
            <StyledHeader>Current Events</StyledHeader>
            <StyledList>
              {current.map((event) => (
                <Event
                  key={event.title}
                  {...event}
                  src={event.src || teleportGreenBg}
                  as="li"
                />
              ))}
            </StyledList>
            <StyledHeader>Upcoming Events</StyledHeader>
            <StyledList>
              {upcoming.map((event) => (
                <Event
                  key={event.title}
                  {...event}
                  src={event.src || teleportBlueBg}
                  as="li"
                />
              ))}
            </StyledList>
          </Centrator>
        </Box>
        <GridDisplay
          centralHeading={true}
          title="Most Popular On Demand Webinars"
          description="Watch one of our popular webinars and videos on demand"
          titleFontSize="header-1"
          titleFontWeight="black"
          bg="grayWave"
        >
          {webinars.map(({ href, title, description }) => (
            <GridTile
              key={href}
              cardBG="webinar"
              title={title}
              src={webinarIcon}
              smallIcon={true}
              caption="WEBINAR"
              href={href}
            >
              {description}
            </GridTile>
          ))}
        </GridDisplay>
        <Drift appId={process.env.NEXT_PUBLIC_DRIFT_ID} />
      </Layout>
      <Footer />
    </>
  );
};

const StyledHeader = styled("h2")(
  css({
    my: [3, 6],
    fontSize: ["header-4", "header-3"],
  })
);

const StyledList = styled("ul")(
  css({
    m: 0,
    p: 0,
    display: "grid",
    gridTemplateColumns: ["repeat(1, 100%)", "repeat(2, 50%)"],
    gap: ["16px", "24px"],
  })
);
