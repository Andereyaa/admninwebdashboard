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
    uploadFile = e => {
        let file = e.target.files[0];
        if (file) {
          this.fileReader = new FileReader()
          this.fileReader.onloadend = this.handleFileRead
          this.fileReader.readAsText(file)
        }
    }
    
    render() {
        const {acceptedFiletype} = this.props
        //setting the value to a blank string ensures the current file can be re-read
        //as the value of the file-input is reset with every render
        return(
            <span className={styles.container}> 
                <input 
                    className={styles.input}
                    type="file"
                    name="file"
                    id="file"
                    onChange={this.uploadFile}
                    value={""} 
                    accept={acceptedFiletype} 
                />
                <label htmlFor="file" >Select File</label>
            </span>
        )
    }
}