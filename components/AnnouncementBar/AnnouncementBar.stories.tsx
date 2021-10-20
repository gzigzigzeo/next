import { AnnouncementBar } from "./AnnouncementBar";
import { Gray1, Gray2, Gray3 } from "components/AnnouncementBar/data";

export default {
  component: AnnouncementBar,
  title: "Site/AnnouncementBar",
};

export const Default = () => <AnnouncementBar rows={[Gray1, Gray2, Gray3]} />;
