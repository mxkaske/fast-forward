import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { allFeatures } from ".contentlayer/generated";
import { Button, Text } from "@fast-forward/ui";
import IconBg from "../ui/IconBg";
import Link from "next/link";

const FeaturesPopover = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button as={Button} variant="none" className={`group`}>
            features
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg border border-transparent dark:border-gray-800">
                <div className="relative grid gap-8 bg-white dark:bg-black p-7 lg:grid-cols-2">
                  {allFeatures
                    .sort((a, b) => a.path.order - b.path.order)
                    .map((item) => (
                      <Link key={item._id} href={item.path.url}>
                        <a
                          href={item.path.url}
                          className="group -m-3 flex items-center rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <div className="shrink-0">
                            <IconBg>{item.emoji}</IconBg>
                          </div>
                          <div className="ml-4">
                            <Text className="font-semibold mb-0">
                              {item.title}
                            </Text>
                            <Text
                              variant="description"
                              className="line-clamp-1 sm:line-clamp-2 md:line-clamp-none mb-0 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                            >
                              {item.excerpt}
                            </Text>
                          </div>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FeaturesPopover;
