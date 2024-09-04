import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

interface ItemBreadCrumb {
  link: string;
  name: string;
}
interface Props {
  items?: ItemBreadCrumb[];
  finalItem: string;
}

export const BreadCrumb = ({ items = [], finalItem }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="my-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((element: ItemBreadCrumb) => {
            return (
              //<div key={element.link} className="flex items-center w-20">
              <>
                <BreadcrumbSeparator className="mx-1" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="font-normal hover:cursor-pointer"
                    onClick={() => navigate(element.link)}
                  >
                    {element.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
              //</div>
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
