import { h } from 'vue'
import { MenuFoldOutlined } from '@ant-design/icons-vue';


// Get URL to SVG file
import myIconUrl from './up.svg';

const img = document.createElement('img');
img.src = myIconUrl;

console.log(img)

export default {
  // template: '',
  components: {
    MenuFoldOutlined
  },  
  render() {
    return h(MenuFoldOutlined)
  }
}