import { useEffect, useState } from "react";
import {
  Button as ButtonBootstrap,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getPlanillasCorreo } from "../../../../store/slices/remuneraciones/planillaCorreos/thunks";
import { enviarBoletas } from "../../../../services/rrhhService";

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

export const SelectDestinatarioComponent = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
}) => {
  const dispatch = useDispatch();

  const { destinatarios, isLoading } = useSelector(
    (state) => state.planillaCorreo
  );

  const [checked, setChecked] = useState([]);

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  // Iniciando left
  // Obtener destinatarios una vez al montar el componente
  useEffect(() => {
    dispatch(getPlanillasCorreo(d_ano, d_mes, c_tippla_id, c_plani_nro));
  }, [c_plani_nro, c_tippla_id, d_ano, d_mes, dispatch]);

  // Actualizar el estado "left" cuando cambian los destinatarios
  useEffect(() => {
    //del array de destinatarios, obtener solo los nombres

    setLeft(
      destinatarios.map(
        (destinatario) =>
          `${destinatario.c_traba_dni}-${destinatario.n_trabajador} ${destinatario.n_traba_correo}`
      )
    );
  }, [destinatarios]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const onClickSend = async  () => {
    

    const dni = right.map((destinatario) => {
      const valores = destinatario.split(" ");
      return {
        c_traba_dni: destinatario.split("-")[0],
        n_traba_correo: valores[valores.length - 1],
      };


      
      // del array right obtener solo los correos
      // const correos = right.map((destinatario) => {
      //   const valores = destinatario.split(" ")
      //   return valores[valores.length - 1]
    });

    await enviarBoletas(d_ano, d_mes, c_tippla_id, c_plani_nro, dni)

    console.log(dni);
  };

  const customList = (items) => (
    <Paper sx={{ width: 350, height: 370, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          Cargando
        </div>
      ) : (
        <>
          {destinatarios.length === 0 ? (
            <Container className="text-center animate__animated animate__fadeIn animate__faster mt-3">
              <Alert variant="danger">
                No se encontraron destinatarios con correo válido
              </Alert>
            </Container>
          ) : (
            <div className="animate__animated animate__fadeIn animate__faster mt-3">
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <small>{left.length} registros</small>
                  {customList(left)}
                </Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label="move all right"
                    >
                      ≫
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllLeft}
                      disabled={right.length === 0}
                      aria-label="move all left"
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <small>{right.length} registros</small> {customList(right)}
                </Grid>
              </Grid>
              <Container className="text-center mt-4">
                <ButtonBootstrap
                  variant="primary"
                  disabled={right.length < 1}
                  onClick={onClickSend}
                >
                  Enviar correos
                </ButtonBootstrap>
              </Container>
            </div>
          )}
        </>
      )}

      {/* {
        left.length > 0 ? (
          <Container className="text-center">
        <ButtonBootstrap variant="primary" disabled={right.length < 1}>
          Enviar correos
        </ButtonBootstrap>
      </Container>
        ) : (
          <Alert variant="danger">
          This is a alert—check it out!
        </Alert>
          
        )

      } */}
    </div>
  );
};
