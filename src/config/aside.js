import { ArrowDownOnSquareIcon, ArchiveBoxIcon, ChartPieIcon, AdjustmentsHorizontalIcon, InboxArrowDownIcon, ArchiveBoxXMarkIcon } from '@heroicons/vue/24/outline'
import { PenerbitanColor, ArchiveColor, DashboardColor, PengendalianColor, SubrogasiColor, Entry, EntrySide } from '../assets/customSvg';
import Cookies from 'js-cookie'
const DocMenuConfig = [
        {
          sectionTitle: "Checkins",
          route: "/checkins",
          activeIcon: InboxArrowDownIcon,
          svgIcon: InboxArrowDownIcon,
          sub: [
            {
              heading: "List Checkins",
              padding: true,
              route: "/checkins",
            },
            {
              heading: "Add Checkins",
              padding: true,
              route: "/checkins/add",
            }
          ],
        },
        {
          sectionTitle: "Item",
          route: "/item",
          activeIcon: ArchiveBoxIcon,
          svgIcon: ArchiveBoxIcon,
          sub: [
            {
              heading: "List Item",
              padding: true,
              route: "/item",
            },
            {
              heading: "Add Item",
              padding: true,
              route: "/item/add",
            }
          ],
        },
        {
          sectionTitle: "Retur",
          route: "/retur",
          activeIcon: ArchiveBoxXMarkIcon,
          svgIcon: ArchiveBoxXMarkIcon
        },
        {
          sectionTitle: "Master",
          route: "/",
          activeIcon: AdjustmentsHorizontalIcon,
          svgIcon: AdjustmentsHorizontalIcon,
          sub: [
            {
              heading: "Gudang",
              padding: true,
              route: "/gudang",
            },
            {
              heading: "Supplier",
              padding: true,
              route: "/supplier",
            },
            {
              heading: "Kategori",
              padding: true,
              route: "/kategori",
            }
          ],
        },
  ];

  export default DocMenuConfig;
  