import dynamic from "next/dynamic";

export const IconCalendar = dynamic(() =>
  import("@tabler/icons-react").then(i => i.IconCalendar)
);

export const IconBrandPatreon = dynamic(() =>
  import("@tabler/icons-react").then(i => i.IconBrandPatreon)
);
