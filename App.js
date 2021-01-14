/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {

  const [singleFile, setSingleFile] = useState(null);

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('file', fileToUpload);
      // Please change file upload URL
      axios.post("http://128.199.185.168/upload-asset", data, {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTQ4ZDk4YS0xMTZjLTRmOGEtOWY1OS00MmVhYThmNjIxYTEiLCJqdGkiOiI3MmRkYjkzYmZhNjEwNGVhOGFlNzU2NGRkNzMxMDYwNjJhNmUzZjcxYjI0NjRjZDYyOWJjM2JlMTVhYjJjNzFkNTIxZWM2N2Y5M2Q3NjQ0NyIsImlhdCI6MTYxMDUxNzQ3OCwibmJmIjoxNjEwNTE3NDc4LCJleHAiOjE2NDIwNTM0NzgsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.jAH5eGOmzwAXMNAlrJwFnyPEjALX92KMSZnN2K37qAP55lO8TsOJIS2DrHAw7Cgjy0YTWS3ayqK6HWInBtUduTFqKYgsJf8h36ZIoqMYhAvmjUAmGcSp4_sxMOxFeVua81o0xGQ7lFisLqFrEvSpNNAp2ReZFmFdDuE5O0fJiQJB4xwDggvCZeT4DI1rNgxHtYgEwaAJk3D87fglWq7jUSwSF69SjnEjaBezl6cQeI5O2FQbbmHQ9OseKpMUVt8GteaUO7ELUq4vG8aPl0qoWT9fn2dyKjMDZOOyCsGWinygEB97OIgiMEsFG4b3tGnlL8vzJRZVKlBkfxbUqX6AswHfpUr0JQfXlYWUz9e8gD18X0En6s5PPhA94qCN5YUT1raxt0XgReZ6yhAnQ3ykNy_tUexzUGfm-i8TxOS742OXRDH8qNqMns8IY_AsVji2P9LtgvCQxRYRpPkaiBe61yjwVXGe55CsBFK7NSFzAokwol5PYgSe3shJkhbiZp4Kxadu673Vlzji237Pk7gsSoL9f53x9IewC73XayWMhklrAR3x0ReGLGlEG7h7xETOmMxW-Cm-t6WU3yBAMIqRQ8oQXn5ra5X737yxYzyrPniT9LtFB-10ldNX0hgOTF4F6mVP_wP1TEYNR8HXYAozIDpR49lLu-HO-cXQkRMfM-E',        'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => { 
        console.log(res.data)
      })
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };


  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.mainBody}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          React Native File Upload Example
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          www.aboutreact.com
        </Text>
      </View>
      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
