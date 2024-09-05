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
  const PATH = "/app/home";
  return (
    <div className="my-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:cursor-pointer"
              onClick={() => navigate(PATH + "/dashboard")}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((element: ItemBreadCrumb) => {
            return (
              <div key={element.link} className="flex items-center w-auto">
                <BreadcrumbSeparator className="mx-2" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="w-auto font-normal hover:cursor-pointer"
                    onClick={() => navigate(`${PATH}${element.link}`)}
                  >
                    {element.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
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
