import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
// import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {/* <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2> */}
        <h1 className={title()}>Welcome to </h1>
        <h1 className={title({ color: "violet" })}>HashIQ</h1>
      </div>

      {/* <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}

      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}
      {/* <!-- Inspired by: https://dribbble.com/shots/5948280-Middle-earth-Hyperloop-Splash-Screen --> */}

{/* <div class="loader-container">
  <div class="title">
    HashIQ
  </div>

  <div class="loader">
    <div class="checkpoint c0">
      <div class="marker"></div>
      <div class="marker"></div>
    </div>
    <div class="checkpoint c1">
      <div class="marker"></div>
      <div class="marker"></div>
    </div>
    <div class="checkpoint c2">
      <div class="marker"></div>
      <div class="marker"></div>
    </div>
    <div class="checkpoint c3">
      <div class="marker"></div>
      <div class="marker"></div>
    </div>
  </div>
        <div>
          
  </div> */}
      
      <div className="loader-container">

        <div className="loader">
          <div className="checkpoint c0">
            <div className="marker"></div>
            <div className="marker"></div>
          </div>
          <div className="checkpoint c1">
            <div className="marker"></div>
            <div className="marker"></div>
          </div>
          <div className="checkpoint c2">
            <div className="marker"></div>
            <div className="marker"></div>
          </div>
          <div className="checkpoint c3">
            <div className="marker"></div>
            <div className="marker"></div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* make a card here */}
      <div className="cards">
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="flex flex-col">
          <p className="text-md">HashIDE</p>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Practice coding on our IDE</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://hashide.netlify.app/"
        >
          Visit HashIDE
        </Link>
      </CardFooter>
      </Card>
            <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="flex flex-col">
          <p className="text-md">HashBin</p>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Share code snippets easily</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://hashbin.netlify.app"
        >
          Visit HashBin
        </Link>
          </CardFooter>
      </Card>
          </div>
          <div className="cards">
            <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="flex flex-col">
          <p className="text-md">HashAI</p>
          {/* <p className="text-small text-default-500"></p> */}
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Mock Interview with AI</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="http://localhost:5500/ui"
        >
          Visit HashAI
        </Link>
      </CardFooter>
        </Card>
        </div>
    </section>
  );
}
