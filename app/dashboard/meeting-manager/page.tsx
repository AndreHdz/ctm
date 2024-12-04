'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { QrReader } from 'react-qr-reader'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Download, CameraIcon } from 'lucide-react'

type Reunion = {
  id: number
  nombre: string
  fecha: string
  horario: string
}

export default function ReunionManager() {
  const [reuniones, setReuniones] = useState<Reunion[]>([
    { id: 1, nombre: "Reunión de equipo", fecha: "2023-07-01", horario: "10:00" },
    { id: 2, nombre: "Revisión de proyecto", fecha: "2023-07-02", horario: "14:30" },
    { id: 3, nombre: "Planificación mensual", fecha: "2023-07-03", horario: "09:00" },
  ])
  const [isQRReaderOpen, setIsQRReaderOpen] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentReunion, setCurrentReunion] = useState<Reunion | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const exportarReporte = (id: number) => {
    console.log(`Exportando reporte para la reunión con ID: ${id}`)
    // Aquí iría la lógica real para exportar el reporte
  }

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedData(data)
      setIsQRReaderOpen(false)
      console.log('Asistencia registrada:', data)
      // Aquí iría la lógica real para registrar la asistencia
    }
  }

  const handleError = (err: Error) => {
    console.error(err)
  }

  const handleOpenDialog = (reunion?: Reunion) => {
    if (reunion) {
      setCurrentReunion(reunion)
      setIsEditing(true)
    } else {
      setCurrentReunion({ id: 0, nombre: '', fecha: '', horario: '' })
      setIsEditing(false)
    }
    setIsDialogOpen(true)
  }

  const handleSaveReunion = () => {
    if (currentReunion) {
      if (isEditing) {
        setReuniones(reuniones.map(r => r.id === currentReunion.id ? currentReunion : r))
      } else {
        const newId = Math.max(...reuniones.map(r => r.id), 0) + 1
        setReuniones([...reuniones, { ...currentReunion, id: newId }])
      }
      setIsDialogOpen(false)
      setCurrentReunion(null)
    }
  }

  const handleDeleteReunion = (id: number) => {
    setReuniones(reuniones.filter(r => r.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrador de Reuniones</h1>

      <Button onClick={() => handleOpenDialog()} className="mb-4">Nueva Reunión</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Horario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reuniones.map((reunion) => (
            <TableRow key={reunion.id}>
              <TableCell>{reunion.nombre}</TableCell>
              <TableCell>{reunion.fecha}</TableCell>
              <TableCell>{reunion.horario}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button onClick={() => exportarReporte(reunion.id)} size="sm" variant="outline">
                    <CameraIcon />
                  </Button>
                  <Button onClick={() => exportarReporte(reunion.id)} size="sm" variant="outline">
                    <Download />
                  </Button>
{/*                   <Dialog open={isQRReaderOpen} onOpenChange={setIsQRReaderOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Asistencia</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Escanear Código QR</DialogTitle>
                      </DialogHeader>
                      <QrReader
                        onResult={(result) => {
                          if (result) {
                            handleScan(result.getText())
                          }
                        }}
                        onError={handleError}
                        constraints={{ facingMode: 'environment' }}
                      />
                      {scannedData && <p>Último código escaneado: {scannedData}</p>}
                    </DialogContent>
                  </Dialog> */}
                  <Button onClick={() => handleOpenDialog(reunion)} size="sm" variant="outline">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar reunión</span>
                  </Button>
                  <Button onClick={() => handleDeleteReunion(reunion.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar reunión</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Reunión' : 'Crear Nueva Reunión'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={currentReunion?.nombre || ''}
                onChange={(e) => setCurrentReunion(prev => prev ? {...prev, nombre: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha" className="text-right">
                Fecha
              </Label>
              <Input
                id="fecha"
                type="date"
                value={currentReunion?.fecha || ''}
                onChange={(e) => setCurrentReunion(prev => prev ? {...prev, fecha: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="horario" className="text-right">
                Horario
              </Label>
              <Input
                id="horario"
                type="time"
                value={currentReunion?.horario || ''}
                onChange={(e) => setCurrentReunion(prev => prev ? {...prev, horario: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleSaveReunion}>{isEditing ? 'Guardar Cambios' : 'Crear Reunión'}</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

