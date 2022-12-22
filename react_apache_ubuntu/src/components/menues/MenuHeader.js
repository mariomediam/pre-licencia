import React from "react";
import { NavDropdownMenu } from "react-bootstrap-submenu";
import { MenuSub } from "./MenuSub";

export const MenuHeader = ({
  menCodi,
  menDesc,
  menProg,
  menTipo,
  menues,
  menCodiFilter,
}) => {
  return (
    <React.Fragment key={menCodi}>
      <NavDropdownMenu title={menDesc.trim()} id="collasible-nav-dropdown">
        <MenuSub
          menCodi={menCodi}
          menues={menues}
          menCodiFilter={menCodiFilter}
        />
      </NavDropdownMenu>
    </React.Fragment>
  );
};
