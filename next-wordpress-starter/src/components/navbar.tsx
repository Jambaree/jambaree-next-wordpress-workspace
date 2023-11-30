import { getMenuItems } from "@jambaree/next-wordpress";
import Link from "next/link";
import { getSiteLogo } from "@jambaree/next-wordpress/src/api/get-site-logo";
import { getSiteSettings } from "@jambaree/next-wordpress/src/api/get-site-settings";
import Edges from "./edges";
import Button from "./ui/button";
import { DesktopMenu } from "./menus/desktop-menu";

export async function Navbar() {
  const menuItems = await getMenuItems({ slug: "main-menu" });
  const logo = await getSiteLogo();
  const settings = await getSiteSettings();

  return (
    <header className="py-4 w-full">
      <Edges
        // className="grid grid-cols-3 grid-flow-col gap-4"
        className="flex justify-between items-center"
      >
        <div className="">
          <Link href="/">
            <span className="sr-only">{settings.title}</span>
            {logo.source_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder */}
                <img
                  alt=""
                  className="h-8 w-auto sm:h-10"
                  // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  src={logo.source_url}
                />
              </>
            ) : null}
          </Link>
        </div>

        <DesktopMenu menuItems={menuItems} />

        <div className="flex justify-end">
          <Button>Get started</Button>
        </div>
      </Edges>
    </header>
  );
}
