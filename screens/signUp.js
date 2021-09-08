import React from 'react';
import { ImageBackground, View, Text, TextInput, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../shared/firebaseMethods';
import { globalStyles } from '../styles/global';
import * as yup from 'yup';
import { Formik } from 'formik';

//https://github.com/jquense/yup/issues/97#issuecomment-306547261
function equalTo(ref, msg) {
	return this.test({
		name: 'equalTo',
		exclusive: false,
    message: msg || 'Both passwords must be the same',
		params: {
			reference: ref.path
		},
		test: function(value) {
      return value === this.resolve(ref) 
		}
	})
};

yup.addMethod(yup.string, 'equalTo', equalTo);

const SignUpSchema = yup.object({
  firstName: yup
      .string()
      .required("First name is a required field"),
  lastName: yup
      .string(),
  email: yup
      .string()
      .email()
      .required("Email is a required field"),
  password: yup
      .string()
      .required("Password is a required field")
      .matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, and one number"
      ),
  password2: yup
      .string()
      .equalTo(yup.ref('password'))
})

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
     <View>
     <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6JwPaFY0B1vbLzXu6HUGW6Ix4TReDfz_mXA&usqp=CAU'}} resizeMode="cover" style={{width: '100%', height: '100%'}}>

     <Formik
        initialValues={{firstName: '', lastName: '', email: '', password: '', password2: ''}}
        validationSchema={SignUpSchema}
        //What happens when you submit the form
        onSubmit={(values) => {registration(values.email, values.password, values.lastName, values.firstName, navigation);}}
      >
    {(props) => (
       <><Text style={globalStyles.titleText}>Create an account </Text><ScrollView onBlur={Keyboard.dismiss}>
              <TextInput
                style={globalStyles.input}
                placeholder="First name*"
                value={props.values.firstName}
                onChangeText={props.handleChange('firstName')}
                onBlur={props.handleBlur('firstName')} />
              <Text style={globalStyles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Last name"
                value={props.values.lastName}
                onChangeText={props.handleChange('lastName')} />
              <Text style={globalStyles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Enter your email*"
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={props.handleBlur('email')} />
              <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Enter your password*"
                value={props.values.password}
                onChangeText={props.handleChange('password')}
                secureTextEntry={true}
                onBlur={props.handleBlur('password')} />
              <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Retype your password to confirm*"
                value={props.values.password2}
                onChangeText={props.handleChange('password2')}
                secureTextEntry={true}
                onBlur={props.handleBlur('password2')} />
              <Text style={globalStyles.errorText}>{props.touched.password2 && props.errors.password2}</Text>
              <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </ScrollView></>
    )}
       </Formik>
       </ImageBackground>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
      borderRadius: 0,
      paddingVertical: 14,
      paddingHorizontal: 10,
      marginTop: 10,
      backgroundColor: '#6bc7b8',
      height: 100,
      justifyContent: "center",
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      fontSize: 22,
      textAlign: 'center',
  },
})