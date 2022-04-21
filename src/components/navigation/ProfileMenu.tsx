import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import cn from "classnames";
import Image from "next/image";
import { useSession } from "next-auth/react";

const nav = [
  {
    label: "team",
    href: "/app/team",
  },
  {
    label: "log out",
    href: "/auth/signout",
  },
];

const ProfileMenu = () => {
  const session = useSession();
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-50 dark:bg-black flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-indigo-500">
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full relative">
            {session.data?.user?.image && (
              <Image
                src={session.data.user.image}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            )}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md py-1 bg-white dark:bg-black dark:border dark:border-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {nav.map(({ href, label }) => (
            <Menu.Item key={href}>
              {({ active }) => (
                // FIXME: with <Link href={href}> wrapper, it won't accept right active state
                <a
                  href={href}
                  className={cn(
                    active && "bg-pink-50/30 dark:bg-pink-900/5 text-pink-500",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {label}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
