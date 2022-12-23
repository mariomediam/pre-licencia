import React from "react";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import { NavDropdown } from "react-bootstrap";

export const MenuSub = ({ menCodi, menues, menCodiFilter }) => {
  return (
    <React.Fragment key={menCodi}>
      {menues
        .filter(
          (menu) =>
            menu.menCodi !== menCodi &&
            menu.menCodi.endsWith(
              "".padEnd(10 - (menCodiFilter.trim().length + 2), "0")
            )
        )
        .map(({ menCodi, menDesc, menProg, menTipo }, i) => (
          <React.Fragment key={i}>
            {menTipo.trim() === "P" ? (
              <NavDropdown.Item href={menProg} key={menCodi}>
                {menDesc.trim()}
              </NavDropdown.Item>
            ) : (
              <DropdownSubmenu title={menDesc.trim()}>
                <MenuSub
                  key={menCodi}
                  menCodi={menCodi}
                  menues={menues.filter((menu) =>
                    menu.menCodi.startsWith(
                      menCodi.substr(0, menCodiFilter.length + 2)
                    )
                  )}
                  menCodiFilter={menCodi.substr(0, menCodiFilter.length + 2)}
                />
              </DropdownSubmenu>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};
