import React from "react";

const Hero = () => {
  return (
    <div
      style={{
        marginTop: "-1.2em",
        background:
          "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url('https://t3.ftcdn.net/jpg/02/95/66/28/360_F_295662882_7K71sF8R44hJYBNDW2fwCZsrX5gtMbeJ.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center lg:space-x-6  herooooo">
        <div class="w-full lg:w-1/2">
          <div class="lg:max-w-lg">
            <h1 class="text-2xl font-medium tracking-wide text-white dark:text-white lg:text-4xl">
              Customizable Products
            </h1>
            <p class="mt-2 text-white dark:text-gray-300">
              Customize any products! Get products for birthdays, events, holidays, and more!
            </p>
            <div class="grid gap-6 mt-8 sm:grid-cols-2">
              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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

              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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

              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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

              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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

              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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

              <div class="flex items-center space-x-6 text-white dark:text-gray-200">
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
          <img
            class="object-cover w-full h-full max-w-2xl rounded-md"
            src="https://scontent.ftpa1-2.fna.fbcdn.net/v/t39.30808-6/254921081_298489432277972_3136038529501951091_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=9Qym6xx02YMAX8cIrTL&_nc_ht=scontent.ftpa1-2.fna&oh=2ced816a03f52ea291c29ce0097ec89f&oe=61A386B2"
            alt="glasses"
          />
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
