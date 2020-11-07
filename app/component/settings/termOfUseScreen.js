import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Styles} from '../../assets/styles';

const TermOfUseScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={Styles.title}> Privacy Policies </Text>
      <Text style={styles.title}>
        Privacy Policy Your privacy is important to us. It is UmbrellaIT's
        policy to respect your privacy regarding any information we may collect
        from you through our app, RestoApp.
        {'\n\n'}We only ask for personal information{'\n\n'}
        when we truly need it to provide a service to you. We collect it by fair
        and lawful means, with your knowledge and consent. We also let you know
        why we’re collecting it and how it will be used.
        {'\n\n'} We only retain collected information for as long as necessary
        to provide you with your requested service. What data we store, we’ll
        protect within commercially acceptable means to prevent loss and theft,
        as well as unauthorized access, disclosure, copying, use or
        modification.
        {'\n\n'} We don’t share any personally identifying information publicly
        or with third-parties, except when required to by law. {'\n\n'}Our app
        may link to external sites that are not operated by us. Please be aware
        that we have no control over the content and practices of these sites,
        and cannot accept responsibility or liability for their respective
        privacy policies.
        {'\n\n'} You are free to refuse our request for your personal
        information, with the understanding that we may be unable to provide you
        with some of your desired services.
        {'\n\n'} Your continued use of our app will be regarded as acceptance of
        our practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
        {'\n\n'}This policy is effective as of 8 November 2020. Privacy Policy
        created with GetTerms.
      </Text>
    </ScrollView>
  );
};
export default TermOfUseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    textAlign: 'justify',
    margin: 10
  }
});
