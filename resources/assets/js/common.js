exports.install = function (Vue) {
    
    Vue.prototype.handle_error = function (error){
        let _self = this
        if (error.response) {
            switch(error.response.status) {
                case 405:
                    _self.$Message.error(error.response.data.message)
                    break
                case 404:
                    _self.$Message.error(error.response.data.message)
                    break
                case 403:
                    _self.$Message.error(error.response.data.message)
                    break
                case 401:
                    _self.$Message.error(error.response.data.message)
                    window.location.href = '/login'
                    break
                case 500:
                    _self.$Message.error('操作失败')
                    break
            }
        } else if (error.request) {
            _self.$Message.error('接口未响应')
        } else {
            _self.$Message.error(error.message)
        }
    }
    
    Vue.prototype.get = function (url, callback = function(){}, params = {}){
        let _self = this
        axios.get(url, {
            params: params
        }).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
    }
    
    Vue.prototype.post = function (url, callback = function(){}, params = {}){
        let _self = this
        axios.post(url, params).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
    }
    
    Vue.prototype.put = function (url, callback = function(){}, params = {}){
        let _self = this
        axios.put(url, params).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
    }
    
    Vue.prototype.patch = function (url, callback = function(){}, params = {}){
        let _self = this
        axios.patch(url, params).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
    }
    
    Vue.prototype.delete = function (url, callback = function(){}, params = {}){
        let _self = this
        axios.delete(url, {
            params: params
        }).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
    }
    
    Vue.prototype.file = function (url, file, callback = function () {}) {
        let _self = this
        
        const formData = new FormData()
        formData.append('file', file)
        
        axios({
            url: url,
            method: 'post',
            data: formData,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        }).then((response) => {
            callback(response.data)
        }).catch(function (error) {
            _self.handle_error(error)
        })
        
    }
}
