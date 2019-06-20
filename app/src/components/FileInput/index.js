import React, {Component} from 'react'
import styles from './FileInput.module.css'

export default class FileInput extends Component {

    static defaultProps = {
        onFileRead: () =>{}
    }
    handleFileRead = e => {
        const {onFileRead} = this.props
        const content = this.fileReader.result
        onFileRead(content)
    }
    uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
          this.fileReader = new FileReader()
          this.fileReader.onloadend = this.handleFileRead
          this.fileReader.readAsText(file)
        }
    }
    
    render() {
        const {acceptedFiletype} = this.props
        return(
            <span className={styles.container}> 
                <input 
                    className={styles.input}
                    type="file"
                    name="file"
                    id="file"
                    onChange={this.uploadFile}
                    accept={acceptedFiletype} 
                />
                <label htmlFor="file" >Select File</label>
            </span>
        )
    }
}