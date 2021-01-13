import Box from "components/Box";

const Video = (props) => {
  return <Box as="video" my={4} maxWidth="100%" {...props} />;
};

export default Video;
