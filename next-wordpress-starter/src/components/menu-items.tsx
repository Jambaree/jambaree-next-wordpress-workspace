import { getMenuItems } from "@jambaree/next-wordpress";

export default async function MenuItems({ className }) {
  const menuItems = await getMenuItems({ id: "main-menu" });

  return (
    <div className={className}>
      {menuItems?.map?.((item, index) => {
        return (
          <a key={index} href={item.path} target={item.target}>
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
