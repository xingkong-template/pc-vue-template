import ImgPreview from './ImgPreview';
import Breadcrumb from './Breadcrumb';
const comp = {
    ImgPreview,
    Breadcrumb
}

const version = '1.0.0';

const install = function(Vue, config = {}) {
    if (install.installed) return;
    Object.keys(comp).forEach(key => {
            Vue.component(comp[key].name, comp[key]);
    });
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};
  

export default { 
    install,
    version
}