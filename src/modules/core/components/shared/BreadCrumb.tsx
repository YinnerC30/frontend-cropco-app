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
import { useToastDiscardChanges } from '../../hooks/useToastDiscardChanges';
import { useFormChange } from '../form/FormChangeContext';
import { memo } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface ItemBreadCrumb {
  link: string;
  name: string;
}
interface Props {
  items?: ItemBreadCrumb[];
  finalItem: string;
  hiddenSeparator?: boolean;
}

export const BreadCrumb: React.FC<Props> = memo(
  ({ items = [], finalItem = '', hiddenSeparator = false }: Props) => {
    const { hasUnsavedChanges } = useFormChange();
    const navigate = useNavigate();
    const { showToast } = useToastDiscardChanges();

    return (
      <div className="sticky top-0 z-50 pb-4 bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="pr-2 border-r">
              <SidebarTrigger />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                className={`hover:cursor-pointer ${
                  finalItem.length > 0 ? 'text-foreground/55' : 'text-foreground'
                }`}
                onClick={() => {
                  if (hasUnsavedChanges) {
                    showToast({ route: PATH_HOME_APP });
                  } else {
                    navigate(PATH_HOME_APP);
                  }
                }}
              >
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((element: ItemBreadCrumb) => {
              return (
                <div key={element.link} className="flex items-center w-auto">
                  <BreadcrumbSeparator className="mx-2" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="w-auto font-normal hover:cursor-pointer text-foreground/55"
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
            {finalItem.length > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbPage>{finalItem}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className={`my-1 ${hiddenSeparator && 'hidden'}`} />
      </div>
    );
  }
);
