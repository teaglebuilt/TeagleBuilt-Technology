import Juniper from './src/components/juniper'

export const onInitialClientRender = () => {
    window.Juniper = Juniper
}