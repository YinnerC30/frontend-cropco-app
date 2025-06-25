import { useEffect, useState } from 'react';

export const useActiveDialog = () => {
  const [isActiveDialog, setIsActiveDialog] = useState(false);

  useEffect(() => {
    const checkActiveDialog = () => {
      const hasRoleDialog = document.querySelector('[role="dialog"]');
      const hasRadixAlertDialog = document.querySelector(
        '[role="alertdialog"]'
      );

      setIsActiveDialog(!!hasRoleDialog || !!hasRadixAlertDialog);
    };

    // Verificar inmediatamente
    checkActiveDialog();

    // Configurar un observer para detectar cambios en el DOM
    const observer = new MutationObserver(checkActiveDialog);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'data-radix-popper-content-wrapper',
        'data-radix-dropdown-menu-content',
        'data-radix-alert-dialog-content',
        'role',
      ],
    });

    return () => observer.disconnect();
  }, []);

  return {
    isActiveDialog,
  };
};
