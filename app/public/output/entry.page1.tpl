<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>Page1</title>
        <link
            rel="stylesheet"
            href="/static/normalize.css"
        />
        <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
    </head>

    <body>
        <h1 style="color: red">hello, Page1!!! -- {{ name }}</h1>
        <input
            type="text"
            id="env"
            value="{{ env }}"
        />
        <div>
            <pre>
            <code>{{options}}</code>
        </pre>
        </div>
        <div>
            <button onclick="getProjectList()">获取项目列表</button>
        </div>

        <script>
            async function getProjectList() {
                const signKey = 'ajofkopdkposkdasldasldasdp'

                const st = Date.now()
                const signature = md5(`${st}_${signKey}`)

                const resp = await axios.request({
                    method: 'get',
                    url: '/api/project/list',
                    params: {
                        page: 1,
                        pageSize: 10,
                        projectKey: 'test'
                    },
                    headers: {
                        s_sign: signature,
                        s_t: st
                    }
                })

                console.log(resp.data)
            }
        </script>
    </body>
</html>
