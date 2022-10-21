export const formatMetaData = (data) => {

    let arrangeData = []
    data.forEach(({type, configuration}) => {
        switch (type) {
            case 'configuration':
                arrangeData = configuration.map((field) => {
                    return {...field, dataIndex: field._id, title: field.label || field._id, key: field._id}
                })
                break;
            default:
                console.log('Only Configuration handle...')

        }
    })
    return arrangeData;
}

export const formatReportsData=(data)=>{
  data.map(report=>report['key']=report._id)
}