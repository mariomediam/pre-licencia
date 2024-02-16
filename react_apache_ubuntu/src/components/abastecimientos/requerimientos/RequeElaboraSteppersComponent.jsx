import React from 'react'
import { RequeElaboraStepTipoComponent } from './RequeElaboraStepTipoComponent'
import { RequeElaboraStepTareasComponent } from './RequeElaboraStepTareasComponent'
import { RequeElaboraStepItemsComponent } from './RequeElaboraStepItemsComponent'
import { RequeElaboraStepMotivoComponent } from './RequeElaboraStepMotivoComponent'
import { RequeElaboraStepPreviewComponent } from './RequeElaboraStepPreviewComponent'

export const RequeElaboraSteppersComponent = ( {activeStep }) => {
  return (
    <div className='mt-4'>
        {activeStep === 0 && <RequeElaboraStepTipoComponent />}
        {activeStep === 1 && <RequeElaboraStepTareasComponent />}
        {activeStep === 2 && <RequeElaboraStepItemsComponent />}
        {activeStep === 3 && <RequeElaboraStepMotivoComponent />}
        {activeStep === 4 && <RequeElaboraStepPreviewComponent />}

    </div>
  )
}
