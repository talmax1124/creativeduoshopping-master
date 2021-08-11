import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import ReactPlayer from "react-player";
// import herovideo from "../herovideo.mp4";

const Hero = () => {
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "100%",
  //     height: "80vh",
  //     position: "relative",
  //     "& video": {
  //       objectFit: "contain",
  //     },
  //   },
  //   overlay: {
  //     position: "absolute",
  //     top: 0,
  //     left: 0,
  //     width: "100%",
  //     height: "100%",
  //     backgroundColor: "rgba(0, 0, 0, 0.7)",
  //   },
  //   title: {
  //     paddingBottom: theme.spacing(4),
  //     color: "whitesmoke",
  //     fontSize: "2.5em",
  //     textAlign: "center",
  //   },
  // }));
  // const classes = useStyles();

  return (
    <div className="bg-gray-50 dark:bg-gray-800" style={{marginTop: "-1.2em"}}>
      <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center lg:space-x-6  herooooo">
        <div class="w-full lg:w-1/2">
          <div class="lg:max-w-lg">
            <h1 class="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">
              Customize To Your Heart's Content
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              We are ready to customize any product to your heart's content!
            </p>
            <div class="grid gap-6 mt-8 sm:grid-cols-2">
              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>5 Star Customer Service</span>
              </div>

              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>Digital Asset(s) Creations</span>
              </div>

              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>Affordable Prices</span>
              </div>

              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>Top Notch Quality Products</span>
              </div>

              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>Payment Security</span>
              </div>

              <div class="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span>Fast shipping</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center w-full h-96 lg:w-1/2">

        <iframe frameborder="0" allowfullscreen="" scrolling="no" allow="autoplay;fullscreen" src="https://onelineplayer.com/player.html?autoplay=true&autopause=false&muted=true&loop=true&url=https%3A%2F%2Fwww.dropbox.com%2Fs%2Ff2vxoruutilu54n%2Fherovideo.mp4%3Fraw%3D1&poster=&time=false&progressBar=false&overlay=false&muteButton=false&fullscreenButton=false&style=light&quality=1080p&playButton=false" className="object-contain-center w-full h-full max-w-2xl rounded-md" title="key"></iframe>
         
          {/* <img
            class="object-cover w-full h-full max-w-2xl rounded-md"
            src="https://onelineplayer.com/player.html?autoplay=true&autopause=false&muted=true&loop=true&url=https%3A%2F%2Fvimeo.com%2F226137389&poster=&time=false&progressBar=false&overlay=false&muteButton=false&fullscreenButton=false&style=light&quality=1080p&playButton=false"
            alt="glasses"
          /> */}
        </div>
      </div>
    </div>

    // <section className={classes.root}>
    //   <ReactPlayer
    //     url={herovideo}
    //     playing
    //     loop
    //     muted
    //     width="100%"
    //     height="100%"
    //   />
    //   <div className={classes.overlay}>
    //     <Box
    //       height="100%"
    //       display="flex"
    //       flexDirection="column"
    //       justifyContent="center"
    //       alignItems="center"
    //       color="#fff"
    //     >
    //       <Typography variant="h3" component="h1" className={classes.title}>
    //         Customize To Your Heart's Content
    //       </Typography>
    //       <a href="#prod">
    //         <Button color="primary" variant="contained">
    //           View Products
    //         </Button>
    //       </a>
    //     </Box>
    //   </div>
    // </section>
  );
};

export default Hero;
