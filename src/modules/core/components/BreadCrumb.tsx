import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ItemBreadCrumb {
  link: string;
  name: string;
}
interface Props {
  items: ItemBreadCrumb[];
  finalItem: string;
}

export const BreadCrumb = ({ items, finalItem }: Props) => {
  return (
    <div className="my-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((element: ItemBreadCrumb) => {
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={element.link}>
                    {element.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            );
          })}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{finalItem}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
