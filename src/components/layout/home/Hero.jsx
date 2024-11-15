import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import HeroImage from "../../../../public/assets/images/hero.png";
import ThemeToggle from "@/components/dashboard/ThemeToggle";

const Hero = () => {
  return (
    <>
      <div className="relative flex flex-col w-full my-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10" alt="Logo" />

            <h4 className="text-3xl font-semibold">
              <span className="text-primary">Saas</span>Ential
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <Button variant="secondary" asChild className="w-fit">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild className="w-fit">
            <Link href="/login">Sign up</Link>
          </Button>
        </nav>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Ultimate Blogging SaaS for Startups
            </span>

            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Setup your Blog{" "}
              <span className="block text-primary">in Minutes!</span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting up your blog is hard and time consuming. We make it easy
              for you to create a blog in minutes
            </p>
            <div className="relative z-50 flex items-center gap-x-5 w-full justify-center mt-5 ">
              {/* <Button variant="secondary" asChild> */}
              <Link
                href="/login"
                className="bg-transparent border border-gray-200 px-4 py-2 rounded-lg shadow-md   transition"
              >
                Sign in
              </Link>
              {/* </Button> */}
              {/* <Button variant="secondary" asChild> */}
              <Link
                href="/register"
                className="bg-transparent border border-gray-200 px-4 py-2 rounded-lg shadow-md   transition"
              >
                Try for Free
              </Link>

              {/* </Button> */}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
              paddingTop: "4rem", // 12 * 0.25rem = 3rem
              paddingBottom: "4rem", // 12 * 0.25rem = 3rem
              marginInline: "auto", // mx-auto
              marginTop: "3rem", // 12 * 0.25rem = 3rem
            }}
          >
            <svg
              className="pointer-events-none"
              style={{
                position: "absolute",
                marginTop: "-6rem", // -24 * 0.25rem = -6rem
                filter: "blur(1.875rem)", // 3xl = 1.875rem
              }}
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                  ></path>
                </g>
              </g>
              <defs></defs>
              {/* <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%"   colorInterpolationFilters="sRGB"
  filterUnits="objectBoundingBox">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur stdDeviation="80" />
      <feColorMatrix
        in="blurred"
        type="matrix"
        values="0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0"
        result="blurredColor"
      />
<feFlood floodOpacity="0" result="BackgroundImageFix" />
<feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
    </filter> */}

              <filter
                id="filter0_f_10_20"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                colorInterpolationFilters="sRGB"
                filterUnits="objectBoundingBox"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur stdDeviation="80" />
              </filter>
            </svg>

            <Image
              src={HeroImage}
              alt="Hero image"
              priority
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
