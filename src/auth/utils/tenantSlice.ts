import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tenant } from '../interfaces/Tenant';
import { getTenantToLocalStorage } from './manageTenantInLocalStorage';

interface TenantState {
  tenant: Tenant;
}

const initialState: TenantState = {
  tenant: getTenantToLocalStorage(),
};

export const tenantSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      const data = action.payload;
      state.tenant = data;
    },
    removeTenant: (state) => {
      state.tenant = {
        id: '',
      };
    },
  },
});

export const { setTenant, removeTenant } = tenantSlice.actions;

export const tenantReducer = tenantSlice.reducer;
export default { tenantReducer };
