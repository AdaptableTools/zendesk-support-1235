import * as React from 'react';
import { useMemo } from 'react';
import { GridOptions } from '@ag-grid-community/core';
import { LicenseManager } from '@ag-grid-enterprise/core';
import {
  Adaptable,
  AdaptableApi,
  AdaptableOptions,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { WebFramework, rowData } from './rowData';
import { agGridModules } from './agGridModules';

LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_LICENSE_KEY);

const CONFIG_REVISION = 1;

export const AdaptableAgGridSecond = () => {
  const gridOptions = useMemo<GridOptions<WebFramework>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      sideBar: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agFilteredRowCountComponent' },
          {
            key: 'Center Panel',
            statusPanel: 'AdaptableStatusPanel',
            align: 'center',
          },
        ],
      },

      suppressMenuHide: true,
      enableRangeSelection: true,
      enableCharts: true,
    }),
    []
  );
  const adaptableOptions = useMemo<AdaptableOptions<WebFramework>>(
    () => ({
      licenseKey: import.meta.env.VITE_ADAPTABLE_LICENSE_KEY,
      primaryKey: 'id',
      userName: 'Test User',
      adaptableId: 'Adaptable 2',
      predefinedConfig: {
        Dashboard: {
          Revision: CONFIG_REVISION,
          Tabs: [
            {
              Name: 'Welcome',
              Toolbars: ['Layout'],
            },
          ],
        },
        StatusBar: {
          Revision: CONFIG_REVISION,
          StatusBars: [
            {
              Key: 'Center Panel',
              StatusBarPanels: ['Theme'],
            },
          ],
        },
        Layout: {
          Revision: CONFIG_REVISION,
          CurrentLayout: 'Basic',
          Layouts: [
            {
              Name: 'Basic',
              Columns: [
                'name',
                'language',
                'github_stars',
                'license',
                'week_issue_change',
                'created_at',
                'has_wiki',
                'updated_at',
                'pushed_at',
                'github_watchers',
                'description',
                'open_issues_count',
                'closed_issues_count',
                'open_pr_count',
                'closed_pr_count',
              ],
            },
          ],
        },
      },
    }),
    []
  );

  const adaptableApiRef = React.useRef<AdaptableApi>();

  return (
    <Adaptable.Provider
      gridOptions={gridOptions}
      adaptableOptions={adaptableOptions}
      modules={[...agGridModules]}
      onAdaptableReady={({ adaptableApi }) => {
        // save a reference to adaptable api
        adaptableApiRef.current = adaptableApi;
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'column', height: '100vh', '--ab-dashboard-header__background': 'blue' } as React.CSSProperties }>
        <Adaptable.UI style={{ flex: 'none' }} />
        <Adaptable.AgGridReact className="ag-theme-alpine" />
      </div>
    </Adaptable.Provider>
  );
};
