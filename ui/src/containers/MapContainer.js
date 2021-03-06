import { connect } from 'react-redux'
import { runCommand } from '../websockets'
import MapView from '../components/MapView'

const mapStateToProps = state => {
  let sessionState = state.config.sessionState
  let photos = []
  if (sessionState && sessionState.photos) {
    photos = sessionState.photos.filter(photo => photo.location[0])
  }

  return {
    photos: photos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: function(e) {
      let bounds = this.getBounds()
      bounds = [
        bounds._southWest.lat,
        bounds._southWest.lng,
        bounds._northEast.lat,
        bounds._northEast.lng,
      ]
      console.log(bounds)
      dispatch(runCommand('get_photos_by_bounds', { bounds: bounds }))
    },
  }
}

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(MapView)

export default MapContainer
