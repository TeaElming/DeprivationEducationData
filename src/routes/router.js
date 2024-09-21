import express from 'express'
import 'reflect-metadata'
import container from '../config/inversify.config.js'
import IDENTIFIERS from '../config/identifiers.js'

export const router = express.Router()

router.post('/manipulate-geo-code-data', async (req, res) => {
  const manipulationController = container.get(
    IDENTIFIERS.ManipulationController
  )
  manipulationController.manipulateGeoCodeData(req, res)
})

router.post('/manipulate-area-data', async (req, res) => {
  const manipulationController = container.get(
    IDENTIFIERS.ManipulationController
  )
  manipulationController.manipulateAreaData(req, res)
})

router.post('/manipulate-average-decile-education', async (req, res) => {
  const manipulationController = container.get(
    IDENTIFIERS.ManipulationController
  )
  manipulationController.manipulateAverageDecileEducation(req, res)
})

router.get('/fetch-geo-code-names', async (req, res) => {
  const educationController = container.get(IDENTIFIERS.EducationController)
  educationController.fetchAreaNames(req, res)
})
