import { Separator } from '@/components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PATH_HOME_APP } from '@/config';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from './form/FormChangeContext';
import { useToastDiscardChanges } from './useToastDiscardChanges';

interface ItemBreadCrumb {
  link: string;
  name: string;
}
interface Props {
  items?: ItemBreadCrumb[];
  finalItem: string;
  hiddenSeparator?: boolean;
}

export const BreadCrumb = ({
  items = [],
  finalItem,
  hiddenSeparator = false,
}: Props) => {
  const { hasUnsavedChanges } = useFormChange();
  const navigate = useNavigate();
  const { showToast } = useToastDiscardChanges();

  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:cursor-pointer"
              onClick={() => {
                if (hasUnsavedChanges) {
                  showToast({ route: PATH_HOME_APP });
                } else {
                  navigate(PATH_HOME_APP);
                }
              }}
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
                    onClick={() => {
                      const LINK = element.link;
                      if (hasUnsavedChanges) {
                        showToast({ route: LINK });
                      } else {
                        navigate(LINK);
                      }
                    }}
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
      <Separator className={`my-1 ${hiddenSeparator && 'hidden'}`} />
    </div>
  );
};
