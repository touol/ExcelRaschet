import { defineConfig , loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { parse, resolve } from 'path'
import tailwindcss from 'tailwindcss'

export default defineConfig(async ({mode})=>{
    process.env = {...process.env,...loadEnv(mode, './')}
    
    return {
        //appType: 'custom',
        base: mode == 'production' ? process.env.VITE_APP_BASE_URL : '/',
        publicDir: false,
        server:{
            host: false,
            port: +process.env.VITE_APP_PORT,
            cors: true,
            origin: `${process.env.VITE_APP_PROTOCOL}://${process.env.VITE_APP_HOST}:${process.env.VITE_APP_PORT}`,
        },
        build: {
            manifest: false,
            copyPublicDir: false,
            minify: true,
            modulePreload: false,
            emptyOutDir: true,
            assetsDir: '',
            cssCodeSplit: true,
            outDir: process.env.VITE_APP_OUTPUT_DIR,
            rollupOptions: {
                external: ['vue',/^pvtables.*/],
                input: {
                    main: resolve(__dirname,'src/main.js')
                },
                output: {
                    assetFileNames: ({name}) => {
                        const {ext} = parse(name)
                        switch(ext){
                            case '.css':
                                return `css/[name][extname]`
                            case '.jpg':
                            case '.png':
                            case '.webp':
                            case '.avif':
                            case '.svg':
                                return `img/[name]-[hash][extname]`
                            default:
                                return `[ext]/[name]-[hash][extname]`
                        }
                    },
                    chunkFileNames: 'js/chunks/[name]-[hash].js',
                    entryFileNames: 'js/[name].js',
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        },
        plugins: [vue(),tailwindcss()],
        resolve: {
            alias: {
                'pvtables/dist/pvtables':'pvtables/src/index'
            }
        }
    }
})
