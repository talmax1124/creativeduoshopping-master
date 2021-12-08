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
              Customize any products! Get products for birthdays, events,
              holidays, and more!
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
            src="https://scontent.ftpa1-1.fna.fbcdn.net/v/t39.30808-6/262086481_312347220892193_561374558070534836_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=EXWZMq_ClIIAX_YY9yF&_nc_ht=scontent.ftpa1-1.fna&oh=1a9f79fbac0b34c52da63f8573d635b9&oe=61B52A4A"
            alt="ImageALt"
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
